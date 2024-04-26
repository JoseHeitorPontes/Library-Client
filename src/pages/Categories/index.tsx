import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { api } from "@/services/api";
import { useSwal } from "@/hooks/useSwal";

import { EditCategoryModal } from "@/components/Modals/EditCategoryModal";
import { NewCategoryModal } from "@/components/Modals/NewCategoryModal";

type CategoriesPagination = GenericPagination<Category>; 

export function Categories()
{
    const { Swal, Toast } = useSwal();

    const [categoriesPagination, setCategoriesPagination] = useState<CategoriesPagination>({} as CategoriesPagination);
    const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);

    const[showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const handleShowNewCategoryModal = () => setShowNewCategoryModal(true);
    const handleCloseNewCategoryModal = () => setShowNewCategoryModal(false);

    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    function handleShowEditCategoryModal(category: Category) {
        setSelectedCategory(category);
        setShowEditCategoryModal(true);
    }
    const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);

    async function handleDeleteCategory(id: number) {
        try {
            const { isConfirmed } = await Swal.fire({
                icon: "info",
                text: "Tem certeza que deseja excluir esta categoria?",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#FF0000",
            });

            if (isConfirmed) {
                await api.delete(`/categories/${id}`);

                fetchCategories();
            
                Toast.fire({
                    icon: "success",
                    text: "Categoria excluida com sucesso!",
                });   
            }
        } catch(error) {
            console.log(error);
        }
    }

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");

            setCategoriesPagination(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Container fluid>
            <NewCategoryModal
                show={showNewCategoryModal}
                onHide={handleCloseNewCategoryModal}
                fetchCategories={fetchCategories}
            />

            <EditCategoryModal
                fetchCategories={fetchCategories}
                category={selectedCategory}
                show={showEditCategoryModal} 
                onHide={handleCloseEditCategoryModal}
            />

            <Button className="mb-4" onClick={handleShowNewCategoryModal}>Nova categoria</Button>

            <div className="d-flex gap-4">
                {categoriesPagination.data?.map((category) => (
                    <Card key={category.id} className="w-25 px-0">
                        <Card.Header className="bg-green">
                            <Card.Title className="text-light">{category.name}</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <p>
                                {category.description}
                            </p>
                        </Card.Body>

                        <Card.Footer>
                            <div className="d-flex gap-2">
                                <Button variant="success" onClick={() => handleShowEditCategoryModal(category)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>Excluir</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </Container>
    );
}