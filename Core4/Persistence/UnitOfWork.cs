using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Core;

namespace Core4.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDBContext context;

        public UnitOfWork(VegaDBContext context)
        {
            this.context = context;
        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
