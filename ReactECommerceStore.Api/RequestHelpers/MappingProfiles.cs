using AutoMapper;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Entities;

namespace ReactECommerceStore.Api.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
    }
}
