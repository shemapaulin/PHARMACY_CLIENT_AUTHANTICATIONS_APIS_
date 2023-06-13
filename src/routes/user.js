import { Router } from "express";
import { clientLogin, createUserAccount,getClientInfo} from "../controllers/userController";

const router = Router();

router.post("/user", createUserAccount);
router.post("/login", clientLogin);
router.get("/account", getClientInfo);

const userRouter = router;
export default userRouter;