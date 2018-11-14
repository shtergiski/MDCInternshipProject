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
    [Route("Publishers")]
    public class PublisherApiController : ApiController
    {
        private MDComSampleEntities1 db = new MDComSampleEntities1();

        [HttpGet]
        [Route("Publishers/GetAllPublishers")]
        public IHttpActionResult GetAllPublishers()
        {
            var publishers = db.Publishers.ToList();
            return Ok(publishers);
        }

        [HttpGet]
        [Route("Publishers/GetPublishersById/{id}")]
        public IHttpActionResult GetPublishersById(int id)
        {
            var publisher = db.Publishers.FirstOrDefault(x => x.PublisherID == id);
            if (publisher != null)
                return Ok(publisher);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("Publishers/SavePublishers")]
        public IHttpActionResult SavePublishers(Publisher publisher)
        {
            if (publisher.PublisherID > 0)
            {
                var dbPublisher = db.Publishers.FirstOrDefault(x => x.PublisherID == publisher.PublisherID);
                dbPublisher.Name = publisher.Name;
                dbPublisher.Country = publisher.Country;

                db.SaveChanges();
            }
            else
            {
                db.Publishers.Add(publisher);
                db.SaveChanges();
            }
            return Ok(publisher.PublisherID);
        }

        [HttpPost]
        [Route("Publishers/AddNewPublisher")]
        public IHttpActionResult AddNewPublisher(Publisher publisher)
        {
            db.Publishers.Add(publisher);
            db.SaveChanges();
            return Ok(publisher);
        }

        [HttpPost]
        [Route("Publishers/UpdatePublisher")]
        public IHttpActionResult UpdatePublisher(Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(publisher).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(publisher.PublisherID))
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
        [Route("Publishers/DeletePublisher")]
        public IHttpActionResult DeletePublisher(Publisher publisher)
        {
            Publisher pub = db.Publishers.Find(publisher.PublisherID);
            if (pub == null)
            {
                return NotFound();
            }
            db.Publishers.Remove(pub);
            db.SaveChanges();
            return Ok("Success");
        }

        private bool PublisherExists(int id)
        {
            return db.Publishers.Count(e => e.PublisherID == id) > 0;
        }
    }
}