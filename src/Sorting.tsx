interface SortingProps {
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  setFilterMode: React.Dispatch<React.SetStateAction<"all" | "overdue">>;
}

export default function Sorting({
  setSorting,
  setFilterMode,
}: SortingProps): JSX.Element {
  return (
    <>
      <p>Sort:</p>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSorting(e.target.value)
        }
      >
        <option value="createdChronological">By creation date</option>
        <option value="createdReverseChronological">
          By creation date (reverse)
        </option>
      </select>
      <p>Show:</p>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilterMode(e.target.value as "all" | "overdue")
        }
      >
        <option value="all">All</option>
        <option value="overdue">Overdue</option>
      </select>
    </>
  );
}
