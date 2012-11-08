module.exports = function(grunt) {
  grunt.initConfig({
    pkg: "<json:package.json>",
    test: {
      files: ["spec/**/*.js"]
    },
    lint: {
      files: ["smap.js", "grunt.js", "spec/*.js"]
    },
    watch: {
      files: "<config:lint.files>",
      tasks: "default"
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    }
  });

  // Default task.
  grunt.registerTask("default", "lint test");
};
