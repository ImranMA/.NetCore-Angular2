using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core4.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }

 
}
