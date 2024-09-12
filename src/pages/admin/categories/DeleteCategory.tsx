import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import './deleteCategory.scss';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import adminReqs from '../../../requests/admin/admin.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import React from 'react';

interface DeleteProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  setIsCategories: (arg: never[]) => void;
  isCategories: never[];
}

export const DeleteCategory: React.FC<DeleteProps> = (props: DeleteProps) => {
  const categoriesName = useSelector((state: RootState) => state.deleteCategory.isDeleteCategoriesName);
  const categoryId = useSelector((state: RootState) => state.deleteCategory.isDeleteCategoriesId);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getTruncatedName = (name: never[] | string) => {
    if (typeof name === 'string') {
      return name.length > 50 ? name.substring(0, 50) + '...' : name;
    }

    return '';
  };

  const truncatedName = getTruncatedName(categoriesName);

  const dispatch = useDispatch();

  const deleteUser = () => {
    setIsLoading(true);
    adminReqs
      .deleteCategories(categoryId)
      .then((deleteResponse: AxiosResponse) => {
        if (deleteResponse?.data) {
          const updateCategories: never[] = props.isCategories.filter(
            (category: { id: string }) => category.id !== categoryId[0]
          );
          props.setIsCategories(updateCategories);
          dispatch(addAlert({ message: `Category(s) ${truncatedName} deleted`, type: 'success' }));
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        if (e?.response?.data) dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
      })
      .finally(() => {
        props.setOpen(false);
        setIsLoading(false);
      });
  };

  console.log(categoryId, categoriesName);

  return (
    <ModalContainer closeButton={false} active={props.open} setIsActive={props.setOpen}>
      <div className={'delete-user-modal'}>
        <div className={'delete-text'}>
          Are you sure you want to delete the category(s)?
          <div className={'delete-text-users'}>{truncatedName}</div>
        </div>
        <div className={'delete-btm-container'}>
          <div className={'delete-submit'}>
            <LoadingBtnModal loading={isLoading} title={'Submit'} onClick={() => deleteUser()} />
          </div>
          <div className={'delete-cancel'}>
            <LoadingBtnModal loading={false} title={'Cancel'} onClick={() => props.setOpen(false)} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
