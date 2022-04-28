const SearchList = (prop) => {
  const lists = prop.blogs;
  if (lists === null) {
    return <p>There are no results</p>;
  } else {
    return (
      <div className="blog-list">
        {lists.map((list, index) => (
          <div className="blog-preview" key={list.id}>
            {list.similarity ? (
              <p>
                {index + 1}. {list.date} - {list.personname} -{" "}
                {list.diseaseprediction} - {list.predictionstatus.toString()} -{" "}
                {Math.round(((list.similarity + Number.EPSILON) * 100) )/ 100}%{" "}
              </p>
            ) : (
              <p>
                {index + 1}. {list.date} - {list.personname} -{" "}
                {list.diseaseprediction} - {list.predictionstatus.toString()} -
                0%{" "}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default SearchList;
