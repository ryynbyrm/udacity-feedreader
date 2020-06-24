/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We"re placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don"t run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test firstly checks feed url is defined and then it checks feed url that is not empty in allFeeds objects
         */
        it("feed URLs are defined and not empty", function () {
            allFeeds.forEach(feed => {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).toBeGreaterThan(0); // reference by:https://stackoverflow.com/questions/34644950/testing-empty-object-in-jasmine-fails or using not.toBe(0)
          });
        });

         /* This test firstly checks feed name is defined and then it checks feed name that is not empty in allFeeds objects
         */
        it("feed name is defined and it is not empty", function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0); // reference by:https://stackoverflow.com/questions/34644950/testing-empty-object-in-jasmine-fails or using not.toBe(0)
              })
         });
    });
    
    describe("The menu", function () {// Test suite name is "The menu"
        /* This test checks menu element is hidden. When I check HTML code, I find body has menu class. Then I check Css file, 
        * I find that menu-hidden class contains which type of styling code has.
         */
        let body = $("body");//body has menu-hidden in HTML code
        it("the menu element is hidden by default", function () {
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
        
        /* This test checks when menu icon clicked, menu should be displayed and then menu icon clicked in secondly, 
        * menu should be hidden in HTML 
        */
        let menuIcon = $(".menu-icon-link");
        it("the menu changes the visibility when menu icon is clicked", function () {
            menuIcon.click(); 
            expect(body.hasClass("menu-hidden")).toBe(true);

            menuIcon.click(); 
            expect(body.hasClass("menu-hidden")).toBe(false);
        });
    });
        
    describe("Initial Entries", function() { // Test suite name is "Initial Entries"
        //refer by: https://jasmine.github.io/tutorials/async callbacks section
        //this function get initial entries which using loadFeed from app.js and beforeEach test checks loadfeed run for initial entries
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        
        /* This test checks that at least one feed have an entry in coming loadFeed() function 
        */
        it("there is at least a single .entry element within the .feed container", function(done) {
            expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });

    describe("New Feed Selection", function() { // Test suite name is "New Feed Selection"
        
        /* This beforeEach test checks that when loadfeed gets first feed and then it waits until second one is getting to finish 
        */
        let currentFeed;
        let newFeed;
        //refer by: https://jasmine.github.io/tutorials/async callbacks section
        beforeEach(function(done) {
            loadFeed(0, function() {
                currentFeed = $(".feed").html();
                loadFeed(1, function() {
                    newFeed = $(".feed").html();
                    done();
                });
                done();
            });
        });

        /* This test firstly checks that currentFeed is defined and is not empty
        * Then, it checks that newFeed is defined and is not empty
        * Furthermore, when two feeds are greatly well loaded, test checks that these two feeds are not equal.
        */
        it("when a new feed is loaded by the loadFeed function that the content actually changes", function(done) {
            expect(currentFeed).toBeDefined();
            expect(currentFeed.length).not.toBe(0);
            expect(newFeed).toBeDefined();
            expect(newFeed.length).not.toBe(0);
            expect(currentFeed).not.toEqual(newFeed);
            done();
        })
    });
}());
