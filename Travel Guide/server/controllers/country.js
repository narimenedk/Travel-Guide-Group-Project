import Country from '../models/country.js'; // Importing the default export

export const CountryController = {
    create: (request, response) => {
        Country.create(request.body)
            .then((object) => response.json(object))
            .catch((err) => response.status(400).json(err));
    },

    getAll: (request, response) => {
        Country.find({})
            .then((objects) => response.json(objects))
            .catch((err) => response.status(400).json(err));
    },

    getOne: (request, response) => {
        Country.findOne({ _id: request.params.id })
            .then((object) => response.json(object))
            .catch((err) => response.status(400).json(err));
    },

    update: (request, response) => {
        Country.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true, runValidators: true }
        )
            .then((updated) => response.json(updated))
            .catch((err) => response.status(400).json(err));
    },

    delete: (request, response) => {
        Country.deleteOne({ _id: request.params.id })
            .then((deleteConfirmation) => response.json(deleteConfirmation))
            .catch((err) => response.status(400).json(err));
    },

    search: (request, response) => {
        const { name } = request.query; // Get the search name from query parameters
        Country.find({ name: { $regex: name, $options: 'i' } }) // Search using regex
            .then((countries) => response.json(countries))
            .catch((err) => response.status(400).json(err));
    }
};
