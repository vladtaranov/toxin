import calendar from '../../components/calendar/calendar';
import dropdown from '../../components/dropdown/dropdown';
import dropdownDates from '../../components/dropdown.dates/dropdown.dates';
import dropdownDatesFilter from '../../components/dropdown.dates-filter/dropdown.dates-filter';
import like from '../../components/like/like';
import pagination from '../../components/pagination/pagination';
import range from '../../components/range/range';

import header from '../../layouts/header/header';
import cardGallery from '../../layouts/room-card/room-card';

import cards from '../../pages/cards/cards';
import formElements from '../../pages/form-elements/form-elements';

// COMPONENTS INIT

calendar.init();
dropdown.init();
dropdownDates.init();
dropdownDatesFilter.init();
like.init();
pagination.init();
range.init();

// LAYOUTS INIT

cardGallery.init();
header.init();

// PAGES INIT

cards.init();
formElements.init();
