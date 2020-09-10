using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oblig3.DAL;
using Oblig3.DAL.DBModel;
using Oblig3.Models;

namespace Oblig3.Controllers
{
    [Route("api/[controller]")]
    public class SporsmalSvarController : Controller
    {
        private readonly DB dB;

        public SporsmalSvarController(DB db)
        {
            dB = db;
        }

        [HttpDelete("{id}")]
        public ActionResult SlettSporsmalOgSvar([FromRoute] int id)
        {
           var funnetSpm = dB.FAQ.
                                Include(f => f.Sporsmal)
                                .Include(f => f.Svar)
                                .Include(f => f.Bruker).SingleOrDefault(f => f.ID == id);
            if(funnetSpm != null)
            {
                dB.FAQ.Remove(funnetSpm);
                dB.SaveChanges();
                return StatusCode(200);

            }
            return StatusCode(500);
        }

        [HttpPost("[action]")]
        public IActionResult postSvar([FromBody] SvarSporsmal svarSporsmal)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (svarSporsmal != null)
            {
                var nySvar = new Svar
                {
                    SvarSpm = svarSporsmal.Svar,
                    Svart = DateTime.Now
                };

                

                var dbFaq = dB.FAQ
                                .Include(f => f.Sporsmal)
                                .Include(f => f.Svar)
                                .Include(f => f.Bruker).SingleOrDefault(f => f.ID == svarSporsmal.ID);
                if(dbFaq != null)
                {
                    dB.Svar.Add(nySvar);
                    dbFaq.Svar = nySvar;
                    dB.SaveChanges();
                    return StatusCode(200);

                }
               
            }
            return StatusCode(500);
        }




        [HttpPost("[action]")]
        public IActionResult postSporsmal([FromBody] BrukerSporsmal brukerSporsmal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(brukerSporsmal != null)
            {
                var nySporsmal = new Sporsmal
                {
                    LagtUt = DateTime.Now,
                    sporsmal = brukerSporsmal.Sporsmal
                };
                dB.Sporsmal.Add(nySporsmal);

                var eksistererBruker = dB.Bruker.Where(b => b.Epost == brukerSporsmal.Epost).FirstOrDefault();

                if(eksistererBruker == null)
                {
                    var nyBruker = new Bruker
                    {
                        Fornavn = brukerSporsmal.Fornavn,
                        Etternavn = brukerSporsmal.Etternavn,
                        Epost = brukerSporsmal.Epost
                    };
                    dB.Bruker.Add(nyBruker);
                    eksistererBruker = nyBruker;
                }

                var nyFaq = new FAQ
                {
                    Sporsmal = nySporsmal,
                    Bruker = eksistererBruker
                };
                dB.FAQ.Add(nyFaq);
                dB.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(500);

        }
   
        

        [HttpGet("[action]")]
        public List<BrukerSporsmal> HentSporsmal()
        {
            var listeSporsmal = dB.FAQ
                                  .Include(s => s.Svar)
                                  .Include(s => s.Bruker)
                                  .Include(s => s.Sporsmal).Where(s => s.Svar != null);

            var returListe = new List<BrukerSporsmal>();
            foreach (var sporsmal in listeSporsmal)
            {
                var brukerSporsmal = new BrukerSporsmal();
                brukerSporsmal.ID = sporsmal.ID;
                brukerSporsmal.Fornavn = sporsmal.Bruker.Fornavn;
                brukerSporsmal.Etternavn = sporsmal.Bruker.Etternavn;
                brukerSporsmal.Epost = sporsmal.Bruker.Epost;
                brukerSporsmal.Sporsmal = sporsmal.Sporsmal.sporsmal;
                brukerSporsmal.Svar = sporsmal.Svar.SvarSpm;
                brukerSporsmal.Positiv = sporsmal.Sporsmal.positiv;
                brukerSporsmal.Negativ = sporsmal.Sporsmal.negativ;

                returListe.Add(brukerSporsmal);
            }

            return returListe;
        }

        [HttpGet("[action]")]
        public List<BrukerSporsmal> HentAlleSporsmal()
        {
            var listeSporsmal = dB.FAQ
                                  .Include(s => s.Svar)
                                  .Include(s => s.Bruker)
                                  .Include(s => s.Sporsmal);

            var returListe = new List<BrukerSporsmal>();
            foreach (var sporsmal in listeSporsmal)
            {
                var brukerSporsmal = new BrukerSporsmal();
                brukerSporsmal.ID = sporsmal.ID;
                brukerSporsmal.Fornavn = sporsmal.Bruker.Fornavn;
                brukerSporsmal.Etternavn = sporsmal.Bruker.Etternavn;
                brukerSporsmal.Epost = sporsmal.Bruker.Epost;
                brukerSporsmal.Sporsmal = sporsmal.Sporsmal.sporsmal;
                brukerSporsmal.Positiv = sporsmal.Sporsmal.positiv;
                brukerSporsmal.Negativ = sporsmal.Sporsmal.negativ;

                if (sporsmal.Svar != null) {
                    brukerSporsmal.Svar = sporsmal.Svar.SvarSpm;

                }


                returListe.Add(brukerSporsmal);
            }

            return returListe;
        }

        [HttpPost("[action]")]
        public IActionResult EndreRating([FromBody] Rating rating)
        {
            var dbSporsmal = dB.Sporsmal.Find(rating.ID);
            if(dbSporsmal != null)
            {
                if(rating.rating)
                {
                    dbSporsmal.positiv += 1;
                    dB.SaveChanges();
                    return StatusCode(200);
                }
                else
                {
                    dbSporsmal.negativ +=1;
                    dB.SaveChanges();
                    return StatusCode(200);
                }
            }
            return StatusCode(500);

        }
    }


}