import bcrypt from 'bcrypt';

const password = '121212';
const start = async () => {
    const hashedPassword = await bcrypt.hash(password, 12);
    // const hashedPassword = '$2b$12$X3P5xKdEXodkrhACodZqUe3PUghr/Nq6D2EnQDGwa6z7UUbNAmSGe';

    console.log('password', hashedPassword);

    const isPasswordValid = await bcrypt.compare(password,hashedPassword);

    console.log('isPasswordValid', isPasswordValid);


}

start();
