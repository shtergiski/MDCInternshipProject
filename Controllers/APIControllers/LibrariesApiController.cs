using InternshipProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InternshipProject.Controllers.APIControllers
{
    [Route("Libraries")]
    public class LibrariesApiController : ApiController
    {
        private MDComSampleEntities1 db = new MDComSampleEntities1();

        [HttpGet]
        [Route("Libraries/GetAllLibraries")]
        public IHttpActionResult GetAllLibraries()
        {
            var libraries = db.Libraries.ToList();
            return Ok(libraries);
        }


        [HttpGet]
        [Route("Libraries/GetLibrariesById/{id}")]
        public IHttpActionResult GetLibrariesById(int id)
        {
            var library = db.Libraries.FirstOrDefault(x => x.LibraryID == id);
            if (library != null)
                return Ok(library);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("Libraries/SaveLibraries")]
        public IHttpActionResult SaveLibraries(Library library)
        {
            if (library.LibraryID > 0)
            {
                var dbLibrary = db.Libraries.FirstOrDefault(x => x.LibraryID == library.LibraryID);
                dbLibrary.Name = library.Name;
                dbLibrary.City = library.City;
                dbLibrary.Address = library.Address;

                db.SaveChanges();
            }
            else
            {
                db.Libraries.Add(library);
                db.SaveChanges();
            }
            return Ok(library.LibraryID);
        }

        [HttpPost]
        [Route("Libraries/AddNewLibrary")]
        public IHttpActionResult AddNewLibrary(Library library)
        {
            db.Libraries.Add(library);
            db.SaveChanges();
            return Ok(library);
        }

        [HttpPost]
        [Route("Libraries/UpdateLibrary")]
        public IHttpActionResult UpdateLibrary(Library library)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(library).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibraryExists(library.LibraryID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok("Success");
        }


        [HttpPost]
        [Route("Libraries/DeleteLibrary")]
        public IHttpActionResult DeleteLibrary(Library library)
        {
            Library lib = db.Libraries.Find(library.LibraryID);
            if (lib == null)
            {
                return NotFound();
            }
            db.Libraries.Remove(lib);
            db.SaveChanges();
            return Ok("Success");
        }

        private bool LibraryExists(int id)
        {
            return db.Libraries.Count(e => e.LibraryID == id) > 0;
        }
    }
}