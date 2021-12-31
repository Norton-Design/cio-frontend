# Customer.io Frontend Portion
Completed by Michael Norton

# To run
1. Set node version to 16.13.1:
    run 'nvm install 16.13.1'
    run 'nvm use 16.13.1'
2. Delete package-lock.json (as needed)
3. Install dependencies:
    run 'npm install'
4. Launch backend app (see other README)    
5. Start app:
    run 'npm run start'
6. To run e2e test:
    Open new terminal
    run 'npm run cypress'
    click 'Run 1 integration spec'




# Things I will add:

1. paginated responses
2. favicon and metadata changes
3. refactor links to be buttons as needed.
4. Can I still improve this error handling any?

# Thoughts and musings:
1. The customer edit page has "created_at" listed as a permanent (albeit, mutable) attribute, as does the backend prompt BUT this isn't found in the sample api call. This presents a problem as I wanted to have all the attributes that couldn't be deleted at the top of the list. Hmm, I'll see if I can adjust the sample api given.... 

Completed this, BUT Go was requiring everthing in attributes to be a string SO I might have to change this back (from str to num) once I've completed everything. This might make testing a pain...

2. Opted to use a table for the customer index page as I believe that while it slightly deviates from its list nature, we gain more accessibility as the table header tags are easier to read and understand. 

3. hooks aren't rendering updates because of the way that I'm calling functions to automcatically filling remaining attribute rows... I'm a fool: forget that React only triggers a rerender when the state ref address changes. Fixed.

4. Finished functionality but I'm getting weird response from the edit customer request: the customer that is returned in the response no longer has attributes at all, none. Thankfully, the value for attributes is at least an empty object (small victory). I don't understand Go enough to see if this is the intended response for the sample API given. I'll have to come back to this after the backend is complete. 

# What would I do next

1. Login/Logout functionality 
The mock-ups imply login/logout functionality although it appears to fall outside of the scope of the instructions. Besides allowing users to have a completely customized user experience, this is also a prerequisite for authorization. Speaking of which.... 

2. Authorization
This is an absolute-must for all applications to prevents unauthorized users from enacting any CRUD functionality on any feature that they shouldn't be able to. For this particular project, the use React Router protected routes in collaboration with a backend auth system.

3. Global State
As the application scales, we'll become limited through the creation of consumption of React Contexts so the use of a stronger global state management solution would be necessary. Through the use of reducers and actions, we can guarantee that the store only retains data that is relevant to us throughout the entire applcation, in a normalized format.

4. Global Error Handling
Establishing global state allows us to allow set up a global error handling component that can be fed errors through the store. This is a fantastic option because it drys up our code immensely, and prevents the end to create error handling solutions for each component.




