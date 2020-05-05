const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateProjectId(request,response, next){
  const {id} = request.params;
  
  if (!isUuid(id)){
    return response.status(400).json({error: 'Invalid project ID.'});
  }
  
  return next();
}
  
app.use('/repositories/:id',validateProjectId );

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const project = {id: uuid(), title, url, techs, likes: 0}
  repositories.push(project);

  return response.json(project);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const{ id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0){
  return response.status(400).json({error: 'Project not found' });
  }

  const project = repositories[projectIndex];

  project.title = title;
  project.url   = url;
  project.techs = techs;

  repositories[projectIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const{ id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0){
  return response.status(400).json({error: 'Project not found' });
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const{ id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({error: 'Project not found' });
  }
  
  project = repositories[projectIndex];

  project.likes = project.likes + 1;

  repositories[projectIndex] =  project;

  return response.json(project);

});

module.exports = app;
