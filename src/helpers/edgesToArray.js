const edgesToArray = data => {
  return data.edges.map(edge => edge.node);
};

export default edgesToArray;
