bootstrap-d3
============

Integrating d3js with twitter.bootstrap.

### Running the examples on Windows

Make sure node.js is installed (we use [Chocolatey][1] a lot):

    cinst nodejs.install
    
Note that this package (in contrary to `nodejs`) includes NPM.

Install grunt and bower:

    npm install -g grunt-cli
    npm install -g bower

Form the project root, run:

    npm install
    grunt    

The first command will install all dependencies for this project, 
the second will run the default tasks in Gruntfile.js.
This all should run without errros

Next install this projects dependencies:

    How should this be done? I'm missing jQuery and d3js. Running bower does nothing.
    
Then, from the root of the project run:

    node app.js
    
and browse to http://localhost:8888/examples/pie-chart.html


 [1]: http:///chocolatey.org
 