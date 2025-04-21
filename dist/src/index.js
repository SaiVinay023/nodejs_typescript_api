"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Routes
app.use('/users', userRoutes_1.default);
//app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//console.error(err);
//res.status(500).json({ message: 'Server Error' });
//});
app.use((err, req, res, next) => {
    console.error(err.stack || err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message || "Internal Server Error" });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.server = app;
exports.default = app;
//# sourceMappingURL=index.js.map