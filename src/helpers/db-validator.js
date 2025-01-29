import Role from '../role/role.model.js';
import User from '../users/user.model.js';
 
export const esRoleValido = async (role = ' ') => {
    const existeRol = await Role.findOne({ role });
 
    if (!existeRol) {
        throw new Error(`Role ${ role } does not exist in the database!`);
    }
}
 
export const existenteEmail = async (correo = ' ') => {
    const existeEmail = await User.findOne({ correo });
 
    if (existeEmail) {
        throw new Error(`Email ${ correo } exists in the database!`);
    }
}