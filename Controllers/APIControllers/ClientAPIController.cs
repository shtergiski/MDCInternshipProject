using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using InternshipProject.Models;

namespace InternshipProject.Controllers.APIControllers
{
    [Route("Clients")]
    public class ClientAPIController : ApiController
    {
        private MDComSampleEntities1 db = new MDComSampleEntities1();

        [HttpGet]
        [Route("Clients/GetAllClients")]
        public IHttpActionResult GetAllClients()
        {
            var clients = db.Clients.ToList();
            return Ok(clients);
        }

        [HttpGet]
        [Route("Clients/GetClientsById/{id}")]
        public IHttpActionResult GetClientsById(int id)
        {
            var client = db.Clients.FirstOrDefault(x => x.ClientID == id);
            if (client != null)
                return Ok(client);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("Clients/SaveClients")]
        public IHttpActionResult SaveClients(Client client)
        {
            if (client.ClientID > 0)
            {
                var dbClient = db.Clients.FirstOrDefault(x => x.ClientID == client.ClientID);
                dbClient.Name = client.Name;
                dbClient.Phone = client.Phone;
                dbClient.Address = client.Address;
                dbClient.City = client.City;


                db.SaveChanges();
            }
            else
            {
                db.Clients.Add(client);
                db.SaveChanges();
            }
            return Ok(client.ClientID);
        }

        [HttpPost]
        [Route("Clients/AddNewClient")]
        public IHttpActionResult AddNewClient(Client client)
        {
            db.Clients.Add(client);
            db.SaveChanges();
            return Ok(client);
        }

        [HttpPost]
        [Route("Clients/UpdateClient")]
        public IHttpActionResult UpdateClient(Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(client).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(client.ClientID))
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
        [Route("Clients/DeleteClient")]
        public IHttpActionResult DeleteClient(Client client)
        {
            Client cli = db.Clients.Find(client.ClientID);
            if (cli == null)
            {
                return NotFound();
            }
            db.Clients.Remove(cli);
            db.SaveChanges();
            return Ok("Success");
        }

        private bool ClientExists(int id)
        {
            return db.Clients.Count(e => e.ClientID == id) > 0;
        }
    }
}