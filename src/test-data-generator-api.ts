import { paths } from './openapi-devtools-spec';

export type ApiPath = keyof paths;
type GetDef<P extends ApiPath> = paths[P]['get'];
export type OkResponse<P extends ApiPath> =
  GetDef<P>['responses'][200]['content']['application/json'];
type ApiPathsWithoutParams = '/Prod//iban' | '/Prod//prepare';
export type ApiPathWithParams = Exclude<ApiPath, ApiPathsWithoutParams>;
export type Params<P extends ApiPathWithParams> =
  GetDef<P>['parameters']['query'];

export const Options = {
  polisnummer: ['Fidea', 'Baloise'],
  nihii: [
    'Arts',
    'Ziekenhuisapotheker',
    'Tandarts',
    'Vroedvrouw',
    'Verpleegkundige',
    'Kinesitherapeut',
    'Logopedist',
    'Opticien',
    'Audicien',
    'Bandagist',
    'Podoloog',
    'Dietisten',
    'Orthopedist',
    'Apotheker',
    'Ziekenhuis',
    'Klinisch-Laboratorium',
  ],
  riziv: [
    'Arts',
    'Ziekenhuisapotheker',
    'Tandarts',
    'Vroedvrouw',
    'Verpleegkundige',
    'Kinesitherapeut',
    'Logopedist',
    'Opticien',
    'Audicien',
    'Bandagist',
    'Podoloog',
    'Dietisten',
    'Orthopedist',
    'Apotheker',
  ],
  plates: [
    '1971-1973',
    '1973-2008',
    '2008-2010',
    '2010-present',
    'royalty',
    'representatives',
    'senators',
    'community politicians',
    'diplomat',
    'pre 7/10/2014 oldtimer',
    'post 7/10/2014 oldtimer',
    'international',
    'agricultural',
    'current international',
    'dealers pre 7/10/2014',
    'test drives',
    'dealers post 7/10/2014',
    'trailer pre 7/10/2014',
    'trailer post 7/10/2014',
    'limousine pre 7/10/2014',
    'limousine post 7/10/2014',
    'test vehicle',
    'motorcycle pre 7/10/2014',
    'motorcycle post 7/10/2014',
    'taxi pre 7/10/2014',
    'taxi post 7/10/2014',
    'military',
  ],
  phoneNumber: [
    'Afghanistan',
    'American Samoa',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Bahamas',
    'Bahrain',
    'Barbados',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Brazil',
    'British Indian Ocean Territory',
    'British Virgin Islands',
    'Brunei',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Christmas Island',
    'Cocos Islands',
    'Comoros',
    'Congo Republic',
    'Cook Islands',
    'Costa Rica',
    "Cote d'Ivoire",
    'Czechia',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Equatorial Guinea',
    'Eritrea',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Lands',
    'Gambia',
    'Germany',
    'Georgia',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Honduras',
    'Isle of Man',
    'Jamaica',
    'Jersey',
    'Kazakhstan',
    'Kiribati',
    'Kosovo',
    'Kyrgyzstan',
    'Lesotho',
    'Lithuania',
    'Macedonia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldavia',
    'Montserrat',
    'Morocco',
    'New Caledonia',
    'Nicaragua',
    'Niger',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Palau',
    'Puerto Rico',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Barthélemy',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Sao Tome and Principe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Sint Maarten',
    'Slovenia',
    'Solomon Islands',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Svalbard and Jan Mayen',
    'Tajikistan',
    'Tanzania',
    'The Netherlands',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'U.S. Minor Outlying Islands',
    'Uganda',
    'Ukraine',
    'United States',
    'Uzbekistan',
    'Venezuela',
    'Virgin Islands',
    'Wallis and Futuna',
    'Western Sahara',
    'Zambia',
  ],
  iban: [
    'Austria',
    'Belgium',
    'Croatia',
    'Czech Republic',
    'Finland',
    'Germany',
    'Hungary',
    'Latvia',
    'Lithuania',
    'Netherlands',
    'Poland',
    'Romania',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
  ],
} as const;
