/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const auth_resolver_1 = __webpack_require__(4);
const services_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(82);
const app_service_1 = __webpack_require__(83);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_resolver_1.AuthResolverModule, services_1.ServicesModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(81), exports);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolverModule = void 0;
const apollo_1 = __webpack_require__(6);
const common_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(7);
const services_1 = __webpack_require__(8);
const authentication_resolvers_resolver_1 = __webpack_require__(80);
let AuthResolverModule = class AuthResolverModule {
};
AuthResolverModule = __decorate([
    (0, common_1.Module)({
        providers: [authentication_resolvers_resolver_1.AuthenticationResolversResolver],
        imports: [
            services_1.ServicesModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                playground: true,
                driver: apollo_1.ApolloDriver
            })
        ],
        exports: [],
    })
], AuthResolverModule);
exports.AuthResolverModule = AuthResolverModule;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(79), exports);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(10);
const auth_repository_1 = __webpack_require__(62);
const prisma_services_authentication_service_1 = __webpack_require__(66);
const handlers_1 = __webpack_require__(69);
const handlers_2 = __webpack_require__(74);
const services_service_1 = __webpack_require__(79);
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            services_service_1.ServicesService,
            ...handlers_1.CommandHandlers,
            ...handlers_2.QueryHandlers,
            auth_repository_1.AuthRepositoryService,
            prisma_services_authentication_service_1.PrismaServiceAuthentication
        ],
        exports: [services_service_1.ServicesService],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(11));


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*
 * Nest CQRS Module
 * Copyright(c) 2017-... Kamil Mysliwiec
 * www.kamilmysliwiec.com
 * MIT Licensed
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(44), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(32), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AggregateRoot = void 0;
const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();
class AggregateRoot {
    constructor() {
        this[_a] = false;
        this[_b] = [];
    }
    set autoCommit(value) {
        this[IS_AUTO_COMMIT_ENABLED] = value;
    }
    get autoCommit() {
        return this[IS_AUTO_COMMIT_ENABLED];
    }
    publish(event) { }
    publishAll(event) { }
    commit() {
        this.publishAll(this[INTERNAL_EVENTS]);
        this[INTERNAL_EVENTS].length = 0;
    }
    uncommit() {
        this[INTERNAL_EVENTS].length = 0;
    }
    getUncommittedEvents() {
        return this[INTERNAL_EVENTS];
    }
    loadFromHistory(history) {
        history.forEach((event) => this.apply(event, true));
    }
    apply(event, isFromHistory = false) {
        if (!isFromHistory && !this.autoCommit) {
            this[INTERNAL_EVENTS].push(event);
        }
        this.autoCommit && this.publish(event);
        const handler = this.getEventHandler(event);
        handler && handler.call(this, event);
    }
    getEventHandler(event) {
        const handler = `on${this.getEventName(event)}`;
        return this[handler];
    }
    getEventName(event) {
        const { constructor } = Object.getPrototypeOf(event);
        return constructor.name;
    }
}
exports.AggregateRoot = AggregateRoot;
_a = IS_AUTO_COMMIT_ENABLED, _b = INTERNAL_EVENTS;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandBus = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
const command_not_found_exception_1 = __webpack_require__(16);
const default_command_pubsub_1 = __webpack_require__(17);
const index_1 = __webpack_require__(11);
const observable_bus_1 = __webpack_require__(18);
let CommandBus = class CommandBus extends observable_bus_1.ObservableBus {
    constructor(moduleRef) {
        super();
        this.moduleRef = moduleRef;
        this.handlers = new Map();
        this.useDefaultPublisher();
    }
    get publisher() {
        return this._publisher;
    }
    set publisher(_publisher) {
        this._publisher = _publisher;
    }
    execute(command) {
        const commandId = this.getCommandId(command);
        const handler = this.handlers.get(commandId);
        if (!handler) {
            throw new command_not_found_exception_1.CommandHandlerNotFoundException(commandId);
        }
        this.subject$.next(command);
        return handler.execute(command);
    }
    bind(handler, id) {
        this.handlers.set(id, handler);
    }
    register(handlers = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }
    registerHandler(handler) {
        const instance = this.moduleRef.get(handler, { strict: false });
        if (!instance) {
            return;
        }
        const target = this.reflectCommandId(handler);
        if (!target) {
            throw new index_1.InvalidCommandHandlerException();
        }
        this.bind(instance, target);
    }
    getCommandId(command) {
        const { constructor: commandType } = Object.getPrototypeOf(command);
        const commandMetadata = Reflect.getMetadata(constants_1.COMMAND_METADATA, commandType);
        if (!commandMetadata) {
            throw new command_not_found_exception_1.CommandHandlerNotFoundException(commandType.name);
        }
        return commandMetadata.id;
    }
    reflectCommandId(handler) {
        const command = Reflect.getMetadata(constants_1.COMMAND_HANDLER_METADATA, handler);
        const commandMetadata = Reflect.getMetadata(constants_1.COMMAND_METADATA, command);
        return commandMetadata.id;
    }
    useDefaultPublisher() {
        this._publisher = new default_command_pubsub_1.DefaultCommandPubSub(this.subject$);
    }
};
CommandBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], CommandBus);
exports.CommandBus = CommandBus;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SAGA_METADATA = exports.EVENTS_HANDLER_METADATA = exports.EVENT_METADATA = exports.QUERY_HANDLER_METADATA = exports.QUERY_METADATA = exports.COMMAND_HANDLER_METADATA = exports.COMMAND_METADATA = void 0;
exports.COMMAND_METADATA = '__command__';
exports.COMMAND_HANDLER_METADATA = '__commandHandler__';
exports.QUERY_METADATA = '__query__';
exports.QUERY_HANDLER_METADATA = '__queryHandler__';
exports.EVENT_METADATA = '__event__';
exports.EVENTS_HANDLER_METADATA = '__eventsHandler__';
exports.SAGA_METADATA = '__saga__';


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandHandlerNotFoundException = void 0;
class CommandHandlerNotFoundException extends Error {
    constructor(commandName) {
        super(`The command handler for the "${commandName}" command was not found!`);
    }
}
exports.CommandHandlerNotFoundException = CommandHandlerNotFoundException;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultCommandPubSub = void 0;
class DefaultCommandPubSub {
    constructor(subject$) {
        this.subject$ = subject$;
    }
    publish(command) {
        this.subject$.next(command);
    }
}
exports.DefaultCommandPubSub = DefaultCommandPubSub;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObservableBus = void 0;
const rxjs_1 = __webpack_require__(19);
class ObservableBus extends rxjs_1.Observable {
    constructor() {
        super();
        this._subject$ = new rxjs_1.Subject();
        this.source = this._subject$;
    }
    get subject$() {
        return this._subject$;
    }
}
exports.ObservableBus = ObservableBus;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CqrsModule = void 0;
const common_1 = __webpack_require__(3);
const command_bus_1 = __webpack_require__(13);
const event_bus_1 = __webpack_require__(21);
const event_publisher_1 = __webpack_require__(33);
const query_bus_1 = __webpack_require__(34);
const explorer_service_1 = __webpack_require__(36);
let CqrsModule = class CqrsModule {
    constructor(explorerService, eventsBus, commandsBus, queryBus) {
        this.explorerService = explorerService;
        this.eventsBus = eventsBus;
        this.commandsBus = commandsBus;
        this.queryBus = queryBus;
    }
    onApplicationBootstrap() {
        const { events, queries, sagas, commands } = this.explorerService.explore();
        this.eventsBus.register(events);
        this.commandsBus.register(commands);
        this.queryBus.register(queries);
        this.eventsBus.registerSagas(sagas);
    }
};
CqrsModule = __decorate([
    (0, common_1.Module)({
        providers: [command_bus_1.CommandBus, query_bus_1.QueryBus, event_bus_1.EventBus, event_publisher_1.EventPublisher, explorer_service_1.ExplorerService],
        exports: [command_bus_1.CommandBus, query_bus_1.QueryBus, event_bus_1.EventBus, event_publisher_1.EventPublisher],
    }),
    __metadata("design:paramtypes", [explorer_service_1.ExplorerService,
        event_bus_1.EventBus,
        command_bus_1.CommandBus,
        query_bus_1.QueryBus])
], CqrsModule);
exports.CqrsModule = CqrsModule;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventBus_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventBus = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(19);
const operators_1 = __webpack_require__(22);
const util_1 = __webpack_require__(23);
const command_bus_1 = __webpack_require__(13);
const constants_1 = __webpack_require__(15);
const exceptions_1 = __webpack_require__(24);
const default_get_event_id_1 = __webpack_require__(30);
const default_pubsub_1 = __webpack_require__(31);
const utils_1 = __webpack_require__(32);
let EventBus = EventBus_1 = class EventBus extends utils_1.ObservableBus {
    constructor(commandBus, moduleRef) {
        super();
        this.commandBus = commandBus;
        this.moduleRef = moduleRef;
        this._logger = new common_1.Logger(EventBus_1.name);
        this.subscriptions = [];
        this.getEventId = default_get_event_id_1.defaultGetEventId;
        this.useDefaultPublisher();
    }
    get publisher() {
        return this._publisher;
    }
    set publisher(_publisher) {
        this._publisher = _publisher;
    }
    onModuleDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    publish(event) {
        return this._publisher.publish(event);
    }
    publishAll(events) {
        if (this._publisher.publishAll) {
            return this._publisher.publishAll(events);
        }
        return (events || []).map((event) => this._publisher.publish(event));
    }
    bind(handler, id) {
        const stream$ = id ? this.ofEventId(id) : this.subject$;
        const subscription = stream$
            .pipe((0, operators_1.mergeMap)((event) => (0, rxjs_1.from)(handler.handle(event))))
            .subscribe({
            error: (error) => {
                this._logger.error(`"${handler.constructor.name}" has thrown an error.`, error);
                throw error;
            },
        });
        this.subscriptions.push(subscription);
    }
    registerSagas(types = []) {
        const sagas = types
            .map((target) => {
            const metadata = Reflect.getMetadata(constants_1.SAGA_METADATA, target) || [];
            const instance = this.moduleRef.get(target, { strict: false });
            if (!instance) {
                throw new exceptions_1.InvalidSagaException();
            }
            return metadata.map((key) => instance[key].bind(instance));
        })
            .reduce((a, b) => a.concat(b), []);
        sagas.forEach((saga) => this.registerSaga(saga));
    }
    register(handlers = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }
    registerHandler(handler) {
        const instance = this.moduleRef.get(handler, { strict: false });
        if (!instance) {
            return;
        }
        const events = this.reflectEvents(handler);
        events.map((event) => this.bind(instance, (0, default_get_event_id_1.defaultReflectEventId)(event)));
    }
    ofEventId(id) {
        return this.subject$.pipe((0, operators_1.filter)((event) => this.getEventId(event) === id));
    }
    registerSaga(saga) {
        if (!(0, util_1.isFunction)(saga)) {
            throw new exceptions_1.InvalidSagaException();
        }
        const stream$ = saga(this);
        if (!(stream$ instanceof rxjs_1.Observable)) {
            throw new exceptions_1.InvalidSagaException();
        }
        const subscription = stream$
            .pipe((0, operators_1.filter)((e) => !!e), (0, operators_1.mergeMap)((command) => (0, rxjs_1.from)(this.commandBus.execute(command))))
            .subscribe({
            error: (error) => {
                this._logger.error(`Command handler which execution was triggered by Saga has thrown an error.`, error);
                throw error;
            },
        });
        this.subscriptions.push(subscription);
    }
    reflectEvents(handler) {
        return Reflect.getMetadata(constants_1.EVENTS_HANDLER_METADATA, handler);
    }
    useDefaultPublisher() {
        this._publisher = new default_pubsub_1.DefaultPubSub(this.subject$);
    }
};
EventBus = EventBus_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [command_bus_1.CommandBus,
        core_1.ModuleRef])
], EventBus);
exports.EventBus = EventBus;


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(29), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidCommandHandlerException = void 0;
class InvalidCommandHandlerException extends Error {
    constructor() {
        super(`Invalid command handler exception (missing @CommandHandler() decorator?)`);
    }
}
exports.InvalidCommandHandlerException = InvalidCommandHandlerException;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidEventsHandlerException = void 0;
class InvalidEventsHandlerException extends Error {
    constructor() {
        super(`Invalid event handler exception (missing @EventsHandler() decorator?)`);
    }
}
exports.InvalidEventsHandlerException = InvalidEventsHandlerException;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidQueryHandlerException = void 0;
class InvalidQueryHandlerException extends Error {
    constructor() {
        super(`Invalid query handler exception (missing @QueryHandler() decorator?)`);
    }
}
exports.InvalidQueryHandlerException = InvalidQueryHandlerException;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidSagaException = void 0;
class InvalidSagaException extends Error {
    constructor() {
        super(`Invalid saga exception. Each saga should return an Observable object`);
    }
}
exports.InvalidSagaException = InvalidSagaException;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryHandlerNotFoundException = void 0;
class QueryHandlerNotFoundException extends Error {
    constructor(queryName) {
        super(`The query handler for the "${queryName}" query was not found!`);
    }
}
exports.QueryHandlerNotFoundException = QueryHandlerNotFoundException;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultReflectEventId = exports.defaultGetEventId = void 0;
const constants_1 = __webpack_require__(15);
/**
 * Null if the published class is not connected to any handler
 * @param event
 * @returns
 */
const defaultGetEventId = (event) => {
    var _a, _b;
    const { constructor } = Object.getPrototypeOf(event);
    return (_b = (_a = Reflect.getMetadata(constants_1.EVENT_METADATA, constructor)) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
};
exports.defaultGetEventId = defaultGetEventId;
const defaultReflectEventId = (event) => {
    return Reflect.getMetadata(constants_1.EVENT_METADATA, event).id;
};
exports.defaultReflectEventId = defaultReflectEventId;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultPubSub = void 0;
class DefaultPubSub {
    constructor(subject$) {
        this.subject$ = subject$;
    }
    publish(event) {
        this.subject$.next(event);
    }
    bridgeEventsTo(subject) {
        this.subject$ = subject;
    }
}
exports.DefaultPubSub = DefaultPubSub;


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventPublisher = void 0;
const common_1 = __webpack_require__(3);
const event_bus_1 = __webpack_require__(21);
let EventPublisher = class EventPublisher {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    mergeClassContext(metatype) {
        const eventBus = this.eventBus;
        return class extends metatype {
            publish(event) {
                eventBus.publish(event);
            }
            publishAll(events) {
                eventBus.publishAll(events);
            }
        };
    }
    mergeObjectContext(object) {
        const eventBus = this.eventBus;
        object.publish = (event) => {
            eventBus.publish(event);
        };
        object.publishAll = (events) => {
            eventBus.publishAll(events);
        };
        return object;
    }
};
EventPublisher = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_bus_1.EventBus])
], EventPublisher);
exports.EventPublisher = EventPublisher;


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBus = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
const exceptions_1 = __webpack_require__(24);
const invalid_query_handler_exception_1 = __webpack_require__(27);
const default_query_pubsub_1 = __webpack_require__(35);
const observable_bus_1 = __webpack_require__(18);
let QueryBus = class QueryBus extends observable_bus_1.ObservableBus {
    constructor(moduleRef) {
        super();
        this.moduleRef = moduleRef;
        this.handlers = new Map();
        this.useDefaultPublisher();
    }
    get publisher() {
        return this._publisher;
    }
    set publisher(_publisher) {
        this._publisher = _publisher;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryId = this.getQueryId(query);
            const handler = this.handlers.get(queryId);
            if (!handler) {
                throw new exceptions_1.QueryHandlerNotFoundException(queryId);
            }
            this.subject$.next(query);
            const result = yield handler.execute(query);
            return result;
        });
    }
    bind(handler, queryId) {
        this.handlers.set(queryId, handler);
    }
    register(handlers = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }
    registerHandler(handler) {
        const instance = this.moduleRef.get(handler, { strict: false });
        if (!instance) {
            return;
        }
        const target = this.reflectQueryId(handler);
        if (!target) {
            throw new invalid_query_handler_exception_1.InvalidQueryHandlerException();
        }
        this.bind(instance, target);
    }
    getQueryId(query) {
        const { constructor: queryType } = Object.getPrototypeOf(query);
        const queryMetadata = Reflect.getMetadata(constants_1.QUERY_METADATA, queryType);
        if (!queryMetadata) {
            throw new exceptions_1.QueryHandlerNotFoundException(queryType.name);
        }
        return queryMetadata.id;
    }
    reflectQueryId(handler) {
        const query = Reflect.getMetadata(constants_1.QUERY_HANDLER_METADATA, handler);
        const queryMetadata = Reflect.getMetadata(constants_1.QUERY_METADATA, query);
        return queryMetadata.id;
    }
    useDefaultPublisher() {
        this._publisher = new default_query_pubsub_1.DefaultQueryPubSub(this.subject$);
    }
};
QueryBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], QueryBus);
exports.QueryBus = QueryBus;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultQueryPubSub = void 0;
class DefaultQueryPubSub {
    constructor(subject$) {
        this.subject$ = subject$;
    }
    publish(query) {
        this.subject$.next(query);
    }
}
exports.DefaultQueryPubSub = DefaultQueryPubSub;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExplorerService = void 0;
const common_1 = __webpack_require__(3);
const modules_container_1 = __webpack_require__(37);
const constants_1 = __webpack_require__(15);
let ExplorerService = class ExplorerService {
    constructor(modulesContainer) {
        this.modulesContainer = modulesContainer;
    }
    explore() {
        const modules = [...this.modulesContainer.values()];
        const commands = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.COMMAND_HANDLER_METADATA));
        const queries = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.QUERY_HANDLER_METADATA));
        const events = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.EVENTS_HANDLER_METADATA));
        const sagas = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SAGA_METADATA));
        return { commands, queries, events, sagas };
    }
    flatMap(modules, callback) {
        const items = modules
            .map((module) => [...module.providers.values()].map(callback))
            .reduce((a, b) => a.concat(b), []);
        return items.filter((element) => !!element);
    }
    filterProvider(wrapper, metadataKey) {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }
    extractMetadata(instance, metadataKey) {
        if (!instance.constructor) {
            return;
        }
        const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
        return metadata ? instance.constructor : undefined;
    }
};
ExplorerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer])
], ExplorerService);
exports.ExplorerService = ExplorerService;


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("@nestjs/core/injector/modules-container");

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(41), exports);
__exportStar(__webpack_require__(42), exports);
__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandHandler = void 0;
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(40);
/**
 * Decorator that marks a class as a Nest command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * The decorated class must implement the `ICommandHandler` interface.
 *
 * @param command command *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#commands
 */
const CommandHandler = (command) => {
    return (target) => {
        if (!Reflect.hasMetadata(constants_1.COMMAND_METADATA, command)) {
            Reflect.defineMetadata(constants_1.COMMAND_METADATA, { id: (0, uuid_1.v4)() }, command);
        }
        Reflect.defineMetadata(constants_1.COMMAND_HANDLER_METADATA, command, target);
    };
};
exports.CommandHandler = CommandHandler;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsHandler = void 0;
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(40);
/**
 * Decorator that marks a class as a Nest event handler. An event handler
 * handles events executed by your application code.
 *
 * The decorated class must implement the `IEventHandler` interface.
 *
 * @param events one or more event *types* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#events
 */
const EventsHandler = (...events) => {
    return (target) => {
        events.forEach((event) => {
            if (!Reflect.hasMetadata(constants_1.EVENT_METADATA, event)) {
                Reflect.defineMetadata(constants_1.EVENT_METADATA, { id: (0, uuid_1.v4)() }, event);
            }
        });
        Reflect.defineMetadata(constants_1.EVENTS_HANDLER_METADATA, events, target);
    };
};
exports.EventsHandler = EventsHandler;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryHandler = void 0;
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(40);
/**
 * Decorator that marks a class as a Nest query handler. A query handler
 * handles queries executed by your application code.
 *
 * The decorated class must implement the `IQueryHandler` interface.
 *
 * @param query query *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#queries
 */
const QueryHandler = (query) => {
    return (target) => {
        if (!Reflect.hasMetadata(constants_1.QUERY_METADATA, query)) {
            Reflect.defineMetadata(constants_1.QUERY_METADATA, { id: (0, uuid_1.v4)() }, query);
        }
        Reflect.defineMetadata(constants_1.QUERY_HANDLER_METADATA, query, target);
    };
};
exports.QueryHandler = QueryHandler;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Saga = void 0;
__webpack_require__(14);
const constants_1 = __webpack_require__(15);
/**
 * Decorator that marks a class as a Nest saga. Sagas may listen and react to 1..N events.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#sagas
 */
const Saga = () => {
    return (target, propertyKey) => {
        const properties = Reflect.getMetadata(constants_1.SAGA_METADATA, target.constructor) || [];
        Reflect.defineMetadata(constants_1.SAGA_METADATA, [...properties, propertyKey], target.constructor);
    };
};
exports.Saga = Saga;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(46), exports);
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(48), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(53), exports);
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(56), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(58), exports);
__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(61), exports);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ofType = void 0;
const operators_1 = __webpack_require__(22);
/**
 * Filter values depending on their instance type (comparison is made
 * using native `instanceof`).
 *
 * @param types List of types implementing `IEvent`.
 *
 * @return A stream only emitting the filtered instances.
 */
function ofType(...types) {
    const isInstanceOf = (event) => !!types.find((classType) => event instanceof classType);
    return (source) => source.pipe((0, operators_1.filter)(isInstanceOf));
}
exports.ofType = ofType;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(64), exports);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepositoryModule = void 0;
const common_1 = __webpack_require__(3);
const auth_repository_service_1 = __webpack_require__(64);
let AuthRepositoryModule = class AuthRepositoryModule {
};
AuthRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_repository_service_1.AuthRepositoryService],
        exports: [auth_repository_service_1.AuthRepositoryService],
    })
], AuthRepositoryModule);
exports.AuthRepositoryModule = AuthRepositoryModule;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepositoryService = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(65);
const prisma_services_authentication_service_1 = __webpack_require__(66);
const api_auth_admin_entity_1 = __webpack_require__(67);
const bcrypt = __webpack_require__(68);
let AuthRepositoryService = class AuthRepositoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerUserRepo(f_name, f_surname, f_username, f_password) {
        const returnObject = new api_auth_admin_entity_1.AuthAdminEntity();
        const existing_user = await this.prisma.userDetails.findUnique({
            where: {
                username: f_username,
            }
        });
        if (existing_user != null) {
            console.log("Found");
            console.log(existing_user);
            returnObject.id = existing_user.id;
            returnObject.username = existing_user.username;
            returnObject.role = existing_user.role;
            returnObject.token = existing_user.token;
            returnObject.name = existing_user.name;
            returnObject.surname = existing_user.surname;
            return returnObject;
        }
        else {
            console.log("not found");
            const rand = () => {
                return Math.random().toString(36).substr(2);
            };
            const token = () => {
                return rand() + rand();
            };
            console.log("Generated token is " + token());
            const f_role = client_1.Role.USER;
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(f_password, salt);
            const new_admin = await this.prisma.userDetails.create({
                data: {
                    username: f_username,
                    password: hash,
                    token: token(),
                    role: f_role,
                    name: f_name,
                    surname: f_surname
                }
            });
            returnObject.id = new_admin.id;
            returnObject.username = new_admin.username;
            returnObject.role = f_role;
            returnObject.token = new_admin.token;
            returnObject.name = new_admin.name;
            returnObject.surname = new_admin.surname;
            console.log(new_admin);
            console.log(returnObject);
            return returnObject;
        }
    }
    async registerAdminRepo(f_name, f_surname, f_username, f_password) {
        const returnObject = new api_auth_admin_entity_1.AuthAdminEntity();
        const existing_user = await this.prisma.userDetails.findUnique({
            where: {
                username: f_username,
            }
        });
        if (existing_user != null) {
            console.log("Found");
            console.log(existing_user);
            returnObject.id = existing_user.id;
            returnObject.username = existing_user.username;
            returnObject.role = existing_user.role;
            returnObject.token = existing_user.token;
            returnObject.name = existing_user.name;
            returnObject.surname = existing_user.surname;
            return returnObject;
        }
        else {
            console.log("not found");
            const rand = () => {
                return Math.random().toString(36).substr(2);
            };
            const token = () => {
                return rand() + rand();
            };
            console.log("Generated token is " + token());
            const f_role = client_1.Role.ADMIN;
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(f_password, salt);
            const new_admin = await this.prisma.userDetails.create({
                data: {
                    username: f_username,
                    password: hash,
                    token: token(),
                    role: f_role,
                    name: f_name,
                    surname: f_surname
                }
            });
            returnObject.id = new_admin.id;
            returnObject.username = new_admin.username;
            returnObject.role = f_role;
            returnObject.token = new_admin.token;
            returnObject.name = new_admin.name;
            returnObject.surname = new_admin.surname;
            console.log(new_admin);
            console.log(returnObject);
            return returnObject;
        }
    }
    async login(f_username, f_password) {
        const returnObject = new api_auth_admin_entity_1.AuthAdminEntity();
        const returning_user = await this.prisma.userDetails.findUnique({
            where: {
                username: f_username
            }
        });
        if (returning_user) {
            returnObject.id = returning_user.id;
            returnObject.username = returning_user.username;
            returnObject.password = returning_user.password;
            returnObject.role = returning_user.role;
            returnObject.token = returning_user.token;
            returnObject.name = returning_user.name;
            returnObject.surname = returning_user.surname;
            return returnObject;
        }
        else {
            return null;
        }
    }
    async verifyToken(f_token) {
        const existing_token = await this.prisma.userDetails.findUnique({
            where: {
                token: f_token
            }
        });
        if (existing_token)
            return true;
        else
            return false;
    }
};
AuthRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_services_authentication_service_1.PrismaServiceAuthentication !== "undefined" && prisma_services_authentication_service_1.PrismaServiceAuthentication) === "function" ? _a : Object])
], AuthRepositoryService);
exports.AuthRepositoryService = AuthRepositoryService;


/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaServiceAuthentication = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(65);
let PrismaServiceAuthentication = class PrismaServiceAuthentication extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
};
PrismaServiceAuthentication = __decorate([
    (0, common_1.Injectable)()
], PrismaServiceAuthentication);
exports.PrismaServiceAuthentication = PrismaServiceAuthentication;


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthAdminEntity = void 0;
const graphql_1 = __webpack_require__(7);
let AuthAdminEntity = class AuthAdminEntity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], AuthAdminEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "surname", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuthAdminEntity.prototype, "role", void 0);
AuthAdminEntity = __decorate([
    (0, graphql_1.ObjectType)({ description: 'Object encapsulates newely registered admin in the authentication schema' })
], AuthAdminEntity);
exports.AuthAdminEntity = AuthAdminEntity;


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandHandlers = void 0;
const register_admin_handler_1 = __webpack_require__(70);
const register_user_hanlder_1 = __webpack_require__(72);
exports.CommandHandlers = [register_admin_handler_1.RegisterAdminHandler, register_user_hanlder_1.RegisterUserHanlder];


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterAdminHandler = void 0;
const cqrs_1 = __webpack_require__(10);
const auth_repository_1 = __webpack_require__(62);
const register_admin_command_1 = __webpack_require__(71);
let RegisterAdminHandler = class RegisterAdminHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        return this.repository.registerAdminRepo(command.name, command.surname, command.username, command.password);
    }
};
RegisterAdminHandler = __decorate([
    (0, cqrs_1.CommandHandler)(register_admin_command_1.RegisterAdminCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepositoryService !== "undefined" && auth_repository_1.AuthRepositoryService) === "function" ? _a : Object])
], RegisterAdminHandler);
exports.RegisterAdminHandler = RegisterAdminHandler;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterAdminCommand = void 0;
class RegisterAdminCommand {
    constructor(username, password, name, surname) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
exports.RegisterAdminCommand = RegisterAdminCommand;


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserHanlder = void 0;
const cqrs_1 = __webpack_require__(10);
const auth_repository_1 = __webpack_require__(62);
const register_user_command_1 = __webpack_require__(73);
let RegisterUserHanlder = class RegisterUserHanlder {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        return this.repository.registerUserRepo(command.name, command.surname, command.username, command.password);
    }
};
RegisterUserHanlder = __decorate([
    (0, cqrs_1.CommandHandler)(register_user_command_1.RegisterUserCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepositoryService !== "undefined" && auth_repository_1.AuthRepositoryService) === "function" ? _a : Object])
], RegisterUserHanlder);
exports.RegisterUserHanlder = RegisterUserHanlder;


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserCommand = void 0;
class RegisterUserCommand {
    constructor(username, password, name, surname) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
exports.RegisterUserCommand = RegisterUserCommand;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryHandlers = void 0;
const loginHandler_handler_1 = __webpack_require__(75);
const verifyTokenHandler_handler_1 = __webpack_require__(77);
exports.QueryHandlers = [loginHandler_handler_1.LoginHandler, verifyTokenHandler_handler_1.VerifyTokenHandler];


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginHandler = void 0;
const cqrs_1 = __webpack_require__(10);
const auth_repository_1 = __webpack_require__(62);
const login_query_1 = __webpack_require__(76);
const bcrypt = __webpack_require__(68);
let LoginHandler = class LoginHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(query) {
        const user = await this.repository.login(query.username, query.password);
        if (user != null) {
            const hash = user.password;
            const isMatch = await bcrypt.compare(query.password, hash);
            console.log(isMatch);
            if (isMatch) {
                return user;
            }
            else {
                console.log("In function LoginHandler, Wrong password was entered");
                return null;
            }
        }
        else {
            console.log("In function LoginHandler, wrong username provided ");
            return null;
        }
    }
};
LoginHandler = __decorate([
    (0, cqrs_1.QueryHandler)(login_query_1.Login),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepositoryService !== "undefined" && auth_repository_1.AuthRepositoryService) === "function" ? _a : Object])
], LoginHandler);
exports.LoginHandler = LoginHandler;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = void 0;
class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
exports.Login = Login;


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyTokenHandler = void 0;
const cqrs_1 = __webpack_require__(10);
const auth_repository_1 = __webpack_require__(62);
const verifyToken_query_1 = __webpack_require__(78);
let VerifyTokenHandler = class VerifyTokenHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(query) {
        return this.repository.verifyToken(query.token);
    }
};
VerifyTokenHandler = __decorate([
    (0, cqrs_1.QueryHandler)(verifyToken_query_1.VerifyToken),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepositoryService !== "undefined" && auth_repository_1.AuthRepositoryService) === "function" ? _a : Object])
], VerifyTokenHandler);
exports.VerifyTokenHandler = VerifyTokenHandler;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyToken = void 0;
class VerifyToken {
    constructor(token) {
        this.token = token;
    }
}
exports.VerifyToken = VerifyToken;


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesService = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(10);
const register_admin_command_1 = __webpack_require__(71);
const register_user_command_1 = __webpack_require__(73);
const login_query_1 = __webpack_require__(76);
const verifyToken_query_1 = __webpack_require__(78);
let ServicesService = class ServicesService {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async registerAdminServ(name, surname, username, password) {
        return this.commandBus.execute(new register_admin_command_1.RegisterAdminCommand(username, password, name, surname));
    }
    async registerUserServ(name, surname, username, password) {
        return this.commandBus.execute(new register_user_command_1.RegisterUserCommand(username, password, name, surname));
    }
    async LoginServ(username, password) {
        return this.queryBus.execute(new login_query_1.Login(username, password));
    }
    async verifyToken(token) {
        return this.queryBus.execute(new verifyToken_query_1.VerifyToken(token));
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], ServicesService);
exports.ServicesService = ServicesService;


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationResolversResolver = void 0;
const graphql_1 = __webpack_require__(7);
const services_1 = __webpack_require__(8);
const api_auth_admin_entity_1 = __webpack_require__(67);
let AuthenticationResolversResolver = class AuthenticationResolversResolver {
    constructor(service) {
        this.service = service;
    }
    hello() {
        return 'Hello World!';
    }
    async registerAdminGateway(name, surname, f_username, f_pass) {
        const resp = await this.service.registerAdminServ(name, surname, f_username, f_pass);
        return resp;
    }
    async registerUserGateway(name, surname, f_username, f_pass) {
        const resp = await this.service.registerUserServ(name, surname, f_username, f_pass);
        return resp;
    }
    async loginGateway(f_username, f_pass) {
        const resp = await this.service.LoginServ(f_username, f_pass);
        return resp;
    }
    async verifyToken(f_token) {
        const resp = await this.service.verifyToken(f_token);
        return resp;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthenticationResolversResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Mutation)(() => api_auth_admin_entity_1.AuthAdminEntity),
    __param(0, (0, graphql_1.Args)("name")),
    __param(1, (0, graphql_1.Args)("surname")),
    __param(2, (0, graphql_1.Args)("username")),
    __param(3, (0, graphql_1.Args)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolversResolver.prototype, "registerAdminGateway", null);
__decorate([
    (0, graphql_1.Mutation)(() => api_auth_admin_entity_1.AuthAdminEntity),
    __param(0, (0, graphql_1.Args)("name")),
    __param(1, (0, graphql_1.Args)("surname")),
    __param(2, (0, graphql_1.Args)("username")),
    __param(3, (0, graphql_1.Args)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolversResolver.prototype, "registerUserGateway", null);
__decorate([
    (0, graphql_1.Query)(() => api_auth_admin_entity_1.AuthAdminEntity),
    __param(0, (0, graphql_1.Args)("username")),
    __param(1, (0, graphql_1.Args)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolversResolver.prototype, "loginGateway", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolversResolver.prototype, "verifyToken", null);
AuthenticationResolversResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.ServicesService !== "undefined" && services_1.ServicesService) === "function" ? _a : Object])
], AuthenticationResolversResolver);
exports.AuthenticationResolversResolver = AuthenticationResolversResolver;


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolverService = void 0;
const common_1 = __webpack_require__(3);
let AuthResolverService = class AuthResolverService {
};
AuthResolverService = __decorate([
    (0, common_1.Injectable)()
], AuthResolverService);
exports.AuthResolverService = AuthResolverService;


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(83);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        console.log("I am running on heroku");
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello from Microservice-Authentication!';
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'microservice-authentication';
    app.setGlobalPrefix(globalPrefix);
    const port = 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}
bootstrap();

})();

/******/ })()
;