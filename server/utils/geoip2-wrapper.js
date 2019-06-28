const maxmind = require('maxmind');

// const getCountry = async (ip) => {
//     return await maxmind.open('/usr/share/GeoIP/GeoLite2-Country.mmdb').then((lookup) => {
//         return lookup.get(ip)
//     });
// }

const getCity = async (ip) => {
    // City database includes all content from Country
    return await maxmind.open('/usr/share/GeoIP/GeoLite2-City.mmdb').then((lookup) => {
        return lookup.get(ip)
    });
}

module.exports = async function(ip) {
    return await getCity(ip);
}