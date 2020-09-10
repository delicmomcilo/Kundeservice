using Microsoft.EntityFrameworkCore;
using Oblig3.DAL.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL
{
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options): base(options){
            
        }

        public virtual DbSet<FAQ> FAQ { get; set; }
        public virtual DbSet<Bruker> Bruker { get; set; }
        public virtual DbSet<Sporsmal> Sporsmal { get; set; }
        public virtual DbSet<Svar> Svar { get; set; }

    }
}
