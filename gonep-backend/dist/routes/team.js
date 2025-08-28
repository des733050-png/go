"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../controllers/team");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', team_1.TeamController.getAllMembers);
router.get('/admin', auth_1.authenticateToken, team_1.TeamController.getAllMembersAdmin);
router.get('/leadership', team_1.TeamController.getLeadership);
router.get('/values', team_1.TeamController.getTeamValues);
router.get('/:id', team_1.TeamController.getMemberById);
router.post('/', auth_1.authenticateToken, team_1.TeamController.createMember);
router.put('/:id', auth_1.authenticateToken, team_1.TeamController.updateMember);
router.delete('/:id', auth_1.authenticateToken, team_1.TeamController.deleteMember);
router.post('/values', auth_1.authenticateToken, team_1.TeamController.createTeamValue);
router.put('/values/:id', auth_1.authenticateToken, team_1.TeamController.updateTeamValue);
router.delete('/values/:id', auth_1.authenticateToken, team_1.TeamController.deleteTeamValue);
exports.default = router;
//# sourceMappingURL=team.js.map