Representational State Transfer (REST) is an architectural style meant for building scalable web applications.

Within REST, there are singular things called resources, such as notes or phonebook in the case of our applications. Every resource has an associated URL which is the resource's unique address. The unique address can be achieved by using unique identifiers (IDS) at the base url of the data you want to retrieve.

There are different operations that can be used on resources:
- GET (fetches resources)
- POST (creates a new resource based on the request data)
- DELETE (removes the identified resource)
- PUT (replaces the entire identified resource with the request data)
- PATCH (replaces a part of the identified resource with the request data)