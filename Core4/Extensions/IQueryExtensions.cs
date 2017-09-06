using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core4.Core.Models;
using Core4.Models;

namespace Core4.Extensions
{
    public static class IQueryExtensions
    {


        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.isSortAscending)
                return query = query.OrderBy(columnsMap[queryObj.SortBy]);
            else
                return query = query.OrderByDescending(columnsMap[queryObj.SortBy]);
          }


        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query ,IQueryObject queryObj)
        {
            if (queryObj.PageSize <= 0)
                queryObj.PageSize = 10;

            if (queryObj.Page <= 0)
                queryObj.Page = 1;

          return  query = query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }


    }
}
