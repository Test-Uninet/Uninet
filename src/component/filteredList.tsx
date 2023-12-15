import React from 'react';

interface FilteredListProps {
  beforeFilter: number[];
}

const FilteredList: React.FC<FilteredListProps> = ({ beforeFilter }) => {
  return (
    <div>
      <h2>Before Filter:</h2>
      <ul>
        {beforeFilter.map((value, index) => (
          <li key={index}>{`[${index}] => ${value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredList;
