import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBreeds, getPaginatedDogs } from "api/queries";
import { Dog } from "api/types";
import Gallery from "components/Gallery";
import Select, { Option } from "components/Select";
import useIntersectionObserver from "hooks/use-intersection-observer";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Home.module.scss";

const Home = () => {
  const [breed, setBreed] = useState<string | undefined>(undefined);
  const pageRef = useRef(1);
  const filteredPageRef = useRef(1);
  const queryClient = useQueryClient();
  const paginatedDogsQuery = useInfiniteQuery(
    ["paginatedDogs", breed],
    getPaginatedDogs(breed),
    {
      getNextPageParam: () =>
        breed ? filteredPageRef.current : pageRef.current,
    }
  );
  const breedsQuery = useQuery(["breeds"], getBreeds);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const isAtBottom = useIntersectionObserver(anchorRef, {});
  const paginatedDogs = useMemo<Dog[] | undefined>(
    () => paginatedDogsQuery.data?.pages.flatMap(({ res }) => res),
    [paginatedDogsQuery]
  );
  const previousPage = useMemo<Dog[] | undefined>(
    () =>
      paginatedDogsQuery.data?.pages &&
      paginatedDogsQuery.data.pages[paginatedDogsQuery.data.pages.length - 1]
        .res,
    [paginatedDogsQuery]
  );

  useEffect(() => {
    if (
      isAtBottom &&
      !paginatedDogsQuery.isLoading &&
      !paginatedDogsQuery.isFetchingNextPage &&
      previousPage?.length
    ) {
      if (breed && previousPage.length)
        filteredPageRef.current = filteredPageRef.current + 1;
      else if (previousPage.length) pageRef.current = pageRef.current + 1;
      paginatedDogsQuery.fetchNextPage();
    }
  }, [isAtBottom, paginatedDogsQuery, previousPage, breed]);

  const onChange = (selectedOption: Option | null) => {
    queryClient.invalidateQueries(["paginatedDogs"]);
    paginatedDogsQuery.refetch();
    if (selectedOption) filteredPageRef.current = 1;
    setBreed(selectedOption?.value);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.filters}>
          <Select
            options={breedsQuery.data?.map(({ id, name }) => ({
              value: `${id}`,
              label: name,
            }))}
            onChange={onChange}
          />
        </div>
        <Gallery
          data={paginatedDogs}
          isLoading={paginatedDogsQuery.isLoading}
        />
      </section>
      <div ref={anchorRef} className={styles.anchor}>
        <ClipLoader
          color="#000000"
          loading={paginatedDogsQuery.isFetchingNextPage}
          size={25}
        />
      </div>
    </>
  );
};

export default Home;
