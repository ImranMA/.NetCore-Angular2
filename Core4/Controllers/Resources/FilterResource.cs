using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Extensions;

namespace Core4.Controllers.Resources
{
    public class VehcileQueryResource: IQueryObject
    {
        public int? MakeId { get; set; }

        public string SortBy { get; set; }

        public bool isSortAscending { get; set; }


        public int Page { get; set; }

        public byte PageSize { get; set; }



    }
}
