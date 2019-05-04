export class IAddSettingViewModel {
Id: number;
Name: string;
Description: string;
ProductId: number;
PriorityId: number;
AssignedToId: number;
PortalId: number;
StatusId: number;
// depend: boolean;
ParentId: number;


settingAttachments: any [];
AttachmentsFiles: any [];

/**
 *
 */
constructor() {
    this.settingAttachments = [];
    this.AttachmentsFiles = [];
}


}


