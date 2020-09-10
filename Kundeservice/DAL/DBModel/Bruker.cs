using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL.DBModel
{
    public class Bruker
    {
        public int ID { get; set; }
      
        public string Fornavn { get; set; }

        public string Etternavn { get; set; }

        public string Epost { get; set; }

    }
}
