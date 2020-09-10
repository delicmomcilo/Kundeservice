using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL.DBModel
{
    public class FAQ
    {
        public int ID { get; set; }
        public virtual Sporsmal Sporsmal { get; set; }
        public virtual Svar Svar { get; set; }

        public virtual Bruker Bruker { get; set; }
    }
}
