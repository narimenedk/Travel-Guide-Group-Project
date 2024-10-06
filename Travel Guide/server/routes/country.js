import { CountryController } from '../controllers/country.js'; // Adjusted to match the export

export default (app) => {
    app.post('/api/country/new', CountryController.create);
    app.get('/api/countries', CountryController.getAll);
    app.get('/api/country/:id', CountryController.getOne);
    app.put('/api/country/update/:id', CountryController.update);
    app.delete('/api/country/delete/:id', CountryController.delete);
    app.get('/api/country/search', CountryController.search);
};
