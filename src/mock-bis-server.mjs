// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';

const app = express();

app.get('/Prod//bis', (req, res) => {
    // Extract query parameters
    const { isGenderKnown } = req.query;
    const { isBirthdateKnown } = req.query;
    const dateParam = req.query.date || '2000-11-15';
    const amountParam = Number(req.query.amount || '000');
    const date = Date.parse(dateParam + 'T00:00:00.000Z');
    // Check date for validity
    if (!date || new Date(date).toISOString().split('T')[ 0 ] !== String(dateParam)) {
        res.status(400);
        res.send('date should be in format year-month-day');
        return;
    }
    // Check amount
    if (!(Number(amountParam) <= 100 && Number(amountParam) > 0)) {
        res.status(400);
        res.send('Amount should be between 1 and 100');
        return;
    }
    if (isBirthdateKnown && isBirthdateKnown !== 'true' && isBirthdateKnown !== 'false') {
        res.status(400);
        res.send('isBirthdateKnown should be a boolean if sent.');
        return;
    }
    if (isGenderKnown && isGenderKnown !== 'true' && isGenderKnown !== 'false') {
        res.status(400);
        res.send('isGenderKnown should be a boolean if sent.');
        return;
    }
    // @ts-expect-error regex groups are not well typed
    const { year, month, day } = String(dateParam).match(
        /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
    ).groups;
    let bisMonthNb = Number(month);
    // The parameter isBirthdateKnown on False will set the date month to 00.
    if (isBirthdateKnown === 'false') {
        bisMonthNb = 0;
    }
    // While the parameter isGenderKnown will increase the month with 40 if set on True
    if (isGenderKnown === 'true') {
        bisMonthNb += 40;
    } else if (isGenderKnown === 'false') {
        // and with 20 if set on False.
        bisMonthNb += 20;
    }

    const bisValWithoutModulo = `${year}${String(bisMonthNb).padStart(2, '0')}${day}${Math.floor(
        Math.random() * 1000
    )}`;
    const modulo = '000'; // TODO calc modulo
    const bisNumber = `${bisValWithoutModulo}${modulo}`;

    // Prepare the response
    const response = {
        bis: Array(amountParam).fill(bisNumber), // TODO generate all random
    };

    res.json(response);
});

app.listen(3001, () => {
    console.log('Express app listening on port 3001');
});
