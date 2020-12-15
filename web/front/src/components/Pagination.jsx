import { useEffect } from 'react';
import { Pagination as PaginationMaterial } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const Pagination = ({maxPages, page, perPage, setPage, fetchProducts, fetchMaxPages}) => {
  useEffect(() => fetchProducts(page, perPage), [fetchProducts, page, perPage]);
  useEffect(() => fetchMaxPages(), [fetchMaxPages]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container justify='center'>
      <PaginationMaterial count={maxPages} page={page} onChange={handleChange} />
    </Grid>
  );
};

export default Pagination;
