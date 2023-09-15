using AutoMapper;
using ReactECommerceStore.Api.DTOs;

namespace ReactECommerceStore.Api.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
    }
}
