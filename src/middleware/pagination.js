paginate = (elems, query) => {
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const start = (page -1) * limit;
    const end = page * limit;
    const results = {};

    if(start > 0 ) results.previous = {page: page - 1, limit: limit};

    if(end < elems.length ) results.next = {page: page + 1, limit: limit};
    
    results.results = elems.slice(start, end);

    return results;
};

module.exports = {
    paginate
};