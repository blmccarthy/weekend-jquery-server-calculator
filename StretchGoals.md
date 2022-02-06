GOALS:


- Only allow the POST call to happen if all necessary input is ready.

    Data integrity is superfluously important! Sometimes users hit the "go button" without fully inputting the needed fields. Show an alert if they left something empty and don't send bad or incomplete data to the server.

- Allow a user to clear the history by clicking on a button. Technically this shouldn't be a GET or a POST. Look into making a DELETE request!

    GETs are used to, well, get information from the server. POSTs are used to send new info to the server. DELETEs are used for, you guessed it, deleting info already on the server.

-------------------------------------------------

- Allow a user to click on an entry in the History list to re-run that calculation. This should display the answer on the calculator interface like a normal calculation.

    Anticipating a user's wants and adding the feature in the interface is often a logical progression that ends up in stretch goals for project.

- Deploy to Heroku!

    Deploying a project makes it available to the masses and is a necessary step for which to prepare when planning a project.