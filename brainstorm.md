# Brainstorm pad

### How to get to first test suite

so to get to the first test suite, I want to use the openapi that I just created
so that we are already working with that, after that, I assume that it will bec
ome more trivial to test the rest.
So then question is: should we first start with doing a test for the API?
and the answer is yes, this way, we do not have to think about the website inter
actions yet, and only have to get into the api and cypress usage.

Now question is how we will do the api testing, or better how we will write the
first api test.
The key here is to really get started, so we should KISS.
Ok so in that spirit, the goal is to create 1 testcase that will just do 1 test
on the api while using the openapi json.
If we do that, it should become trivial to extend upon this and to do the same f
or the other api routes.
