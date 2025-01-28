import jwt from 'jsonwebtoken';

export const generarJWT = (uid ='')=>{
    return new Promise ((resolve, reject)=>{

        const payload ={ uid};
        jwt.sign(
            payload, 
            process.env.K3YT0MYGIT, 
            {
                expiresIn: '1h'
            },
            (err, token)=>{
                err ? (console.log (err), reject ('no se pudo generar el token')) : resolve (token);
            }
        )
    })
}