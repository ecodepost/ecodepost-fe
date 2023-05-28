import {useModel} from '@umijs/max';
import DropDownSpace from '@/components/BreadCrumb/Dropdown/DropDownSpace';
import {IsCmtGroup, IsCmtSpace} from '@/utils/GetUrlParams';
import GroupDropdown from "@/components/BreadCrumb/GroupDropdown/GroupDropdown";
import {useEffect} from "react";

interface BreadCrumbProps {
  spacePms?: Spacev1GetSpacePermissionByUidRes;
}

const BreadCrumb = (props: BreadCrumbProps) => {
  const {name, setName} = useModel('header');
  const {spacePms} = props;

  useEffect(() => {
    return () => {
      setName("")
    }
  }, [])

  const renderHeader = () => {
    if (IsCmtGroup()) {
      return <GroupDropdown/>
    } else if (IsCmtSpace()) {
      return <DropDownSpace spacePms={spacePms}/>
    } else {
      return <span>{name}</span>
    }
  }

  return (
    <>
      {renderHeader()}
    </>
  );
};

export default BreadCrumb;
