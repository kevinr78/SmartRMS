interface componentProperties {
  title?: string;
  endpoint?: string;
  method?: string;
}
function changeModalComponent(name: string) {
  let componentProperties: componentProperties = {};
  switch (name) {
    case "InviteMembers":
      componentProperties.title = "Invite Members";
      componentProperties.endpoint = "/household";
      componentProperties.method = "patch";
      modalComponent.value = InviteMembers;
      break;
    case "Settings":
      componentProperties.title = "Settings";
      modalComponent.value = Settings;
      break;
    case "NewHousehold":
      componentProperties.title = "New Household";
      modalComponent.value = NewHousehold;
      break;
    default:
      break;
  }
  componentPropertiesRef.value = componentProperties;
  openModal();
}

function openModal() {
  document.getElementById("my_modal_1").showModal();
}
