import express from "express";
import ValidateToken from "../middleware/validateToken";
import {
	getCont,
	CreateCont,
	UpdateCont,
	deleteCont,
	getSingCont,
} from "../Controller/procControl";
const contactRouter = express.Router();

contactRouter.use(ValidateToken)

contactRouter.get("/", getCont);
contactRouter.get("/:id", getSingCont);
contactRouter.post("/", CreateCont);
contactRouter.put("/:id", UpdateCont);
contactRouter.delete("/:id", deleteCont);

export default contactRouter;
