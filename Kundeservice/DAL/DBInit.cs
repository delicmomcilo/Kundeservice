using Oblig3.DAL.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL
{
    public class DBInit
    {
        public static void Seed(DB dbContext)
        {
            dbContext.Database.EnsureCreated();

            if (dbContext.Sporsmal.Any())
            {
                return;
            }

            var svar1 = new Svar
            {
                SvarSpm = "Du kan bestille film på nettsiden vår. Dette gjøres ved at du legger filmene inn i handlekurven og kjøper dem videre.",
                Svart = DateTime.Now,
                SvartAv = "Momcilo"
            };


            var sporsmal1 = new Sporsmal
            {
                sporsmal = "Hvordan bestiller jeg en film?",
                LagtUt = DateTime.Now,
            };

            var ubesvartSpm = new Sporsmal
            {
                sporsmal = "Hvordan kan jeg lage en bruker=",
                LagtUt = DateTime.Now
            };

            var sporsmalSvar1 = new FAQ
            {
                Sporsmal = sporsmal1,
                Svar = svar1
            };


            var bruker = new Bruker
            {
                Epost = "momcilodelic@gmail.com",
                Fornavn = "Momcilo",
                Etternavn = "Delic",
            };

            var sporsmalSvarH = new FAQ
            {
                Sporsmal = ubesvartSpm,
                Bruker = bruker,
            };

            dbContext.FAQ.Add(sporsmalSvar1);


            dbContext.SaveChanges();
        }

    }
}
