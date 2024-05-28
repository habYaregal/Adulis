import pass from 'passport';

export const userAuth = pass.authenticate('jwt', { session: false })