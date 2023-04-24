interface CreateTaskPayload {
	id?: any;
	name?: string;
	description?: string;
	listId?: string | number;
	deadline?: string | Date;
	owner?: string;
	autoDone?: boolean;
	priority?: number;
	label?: any[];
	taskTypeId?: number;
	periodReport?: string;
	parentId?: any;
}

interface ListBoardType {
	id: number;
	name: string;
	typeId: number;
	deadline: string;
	archived: boolean;
	deleted: boolean;
	position: number;
	owner: string;
	backgroundUrl: string;
	done: boolean;
	createdUser: string;
	createdTime: string;
	modifiedUser: string;
	modifiedTime: string;
	status: string;
	type: number;
	numberProcess: number;
	default: boolean;
}

interface ItemListByBoardType {
	id: number;
	name: string;
	description: string;
	boardId: number;
	deadline: Date;
	owner: string;
	done: boolean;
	deleted: any;
	createdUser: string;
	createdTime: Date;
	modifiedUser: any;
	modifiedTime: any;
	numberProcess: number;
	tasks: Task[];
	backgroundUrl: string;
	status: Status2;
	doneTime: any;
	periodReport: any;
	acceptTime: any;
	listUserRoles: ListUserRole[];
	autoDone: boolean;
	resTime: any;
	canView: boolean;
	canEdit: boolean;
	ticketIdList: number;
	archived: boolean;
	type: number;
	priority: number;
}

interface ListByBoardType {
	content: ItemListByBoardType[];
}

interface ListLabelTagType {
	id: number;
	name: string;
	color: string;
	deleted: any;
	tenantId: any;
	createdUser: any;
	createdTime: any;
	modifiedUser: any;
	modifiedTime: any;
	type: number;
	checked: boolean;
	directoryId: any;
	boardId: any;
}

interface ListMemBerType {
	content: ItemListMemberType[];
}

interface ItemListMemberType {
	id: number;
	username: string;
	fullName: string;
	email: string;
	imageUrl: string;
	deleted: any;
	emailVerified: any;
	provider: any;
}

interface labelType {
	id: number;
	name: string;
	color: string;
}

interface userRoleType{
	id: number,
	role: string,
	usernameLowerCase: any,
	member: string,
	level: number,
	imageUrl: string
}
interface TaskDetailType {
	id: number;
	name: string;
	owner: string;
	startTime: any;
	deadline: Date | string;
	description: string;
	numberProcess: number;
	status: string;
	priority: number;
	labels: labelType[];
	usersRole: userRoleType[];
	listId: number;
	listName: any;
	boardId: any;
	boardName: any;
	resultNumber: number;
	issuedNumber: number;
	commentNumber: number;
}
