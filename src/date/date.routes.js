import { Router } from "express";
import { check } from "express-validator";
import { saveDate, getDates, searchDate, updateDate, deleteDate } from "./date.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("email", "Email is required!").notEmpty(),
        check("id", "ID is required!").notEmpty(),
        validarCampos
    ],
    saveDate
);

router.get("/", getDates);

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID format!").isMongoId(),
        validarCampos
    ],
    searchDate
);

router.put(
    "/:id",
    [
        check("id", "Invalid ID format!").isMongoId(),
        validarCampos
    ],
    updateDate
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID format!").isMongoId(),
        validarCampos
    ],
    deleteDate
);

export default router;
