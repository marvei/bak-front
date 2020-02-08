import React, { Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router";

import { AppHistory } from "./app-history";
import { AppRoutesPaths } from "./app-routes-path";
import { PageLoader } from "src/modules/loaders";
import { LandingPageRoute } from "./routes/landing-page-route";
import { UserPageRoute } from "./routes/user-page-route";
import { PagePageRoute } from "./routes/page-page-route";
import { TournamentPageRoute } from "./routes/tournament-page-route";
import { LoginPageRoute } from "./routes/login-page-route";
import { MatchPageRoute } from "./routes/match-page-route";
import { TeamPageRoute } from "./routes/team-page-route";
import { PublicTeamPageRoute } from "./routes/public-team-page-route";

export const AppRouter: React.FC = () => (
    <Router history={AppHistory}>
        <Switch>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <Redirect exact path={AppRoutesPaths.index} to={AppRoutesPaths.loginPage}></Redirect>
                <Route exact path={AppRoutesPaths.landingPage} component={LandingPageRoute}></Route>
                <Route exact path={AppRoutesPaths.pagePage} component={PagePageRoute}></Route>
                <Route exact path={AppRoutesPaths.userPage} component={UserPageRoute}></Route>
                <Route exact path={AppRoutesPaths.tournamentPage} component={TournamentPageRoute}></Route>
                <Route exact path={AppRoutesPaths.loginPage} component={LoginPageRoute}></Route>
                <Route exact path={AppRoutesPaths.matchPage} component={MatchPageRoute}></Route>
                <Route exact path={AppRoutesPaths.teamPage} component={TeamPageRoute}></Route>
                <Route exact path={AppRoutesPaths.publicTeamPage} component={PublicTeamPageRoute}></Route>
            </Suspense>
        </Switch>
    </Router>
);
