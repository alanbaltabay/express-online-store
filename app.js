// exporting packages
const path = require('path');
const passport = require('passport');
const routes = require('./routes/routes');
const orderRoutes = require('./routes/orderRoutes');
const mongoose = require('mongoose');
const express = require('express'); // exports function
const favicon = require('serve-favicon');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const compression = require('compression');

// returning an express object
const app = express(); // returns object

// registering view engine
app.set('view engine', 'ejs');

// middlewares & static files
app.use(express.static('public'));
app.use(
	favicon(path.join(__dirname, 'public', 'images', 'icons', 'favicon.ico'))
);
app.use(flash());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(compression());

// connecting to mongodb & listenning for requests
const PORT = 3000;
const dbURI =
	'mongodb+srv://user1:D9A6930NMN5VgT2i@online-store.5zniayu.mongodb.net/?retryWrites=true&w=majority';

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Diploma project has been started on port ${PORT}.`);
		})
	)
	.catch((error) => console.log(error));

// handling routes
app.use('/', routes);
app.use('/orders', orderRoutes);

// handling 404 page
app.use((request, response) => {
	response.status(404).render('404', { headTitle: '404' });
});
